import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Keyboard, Text } from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import axios from 'axios';

type ContentItem = {
  type: 'scene-heading' | 'action' | 'character' | 'dialogue';
  text: string;
};

type ScreenwritingEditorProps = {
  initialContent?: ContentItem[];
};

const ScreenwritingEditor: React.FC<ScreenwritingEditorProps> = ({
  initialContent = [],
}) => {
  const [content, setContent] = useState<ContentItem[]>(initialContent);
  const richText = useRef<RichEditor>(null);

  useEffect(() => {
    console.log('hit');
    const fetchScenes = async () => {
      try {
        const response = await fetch(
          'http://192.168.0.46:5001/api/Scenes/fetchAllScenes',
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched scenes:', data);

        // Assuming data is an array of scenes
        setContent(data);
      } catch (error) {
        console.error('Error fetching scenes:', error);
      }
    };

    fetchScenes();
  }, []);

  useEffect(() => {
    if (richText.current) {
      const formattedContent = content
        .map((item) => {
          switch (item.type) {
            case 'action':
              return `<p style="${styles.action.cssText}">${item.text}</p>`;
            case 'character':
              return `<p style="${styles.characterName.cssText}">${item.text}</p>`;
            case 'dialogue':
              return `<p style="${styles.dialogue.cssText}">${item.text}</p>`;
            default:
              return `<p>${item.text}</p>`;
          }
        })
        .join('');
      richText.current?.setContentHTML(formattedContent);
    }
  }, []);

  const toolbarActions = ['custom-hide-keyboard'];

  const customIconMap = {
    'custom-hide-keyboard': () => <Text style={{ fontSize: 20 }}>⬇️</Text>,
  };

  const onPressCustomAction = (action: string) => {
    if (action === 'custom-hide-keyboard') {
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <RichToolbar />
      <RichEditor ref={richText} style={styles.editor} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  editor: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
  },
  action: {
    textAlign: 'left',
    cssText: 'text-align: left;',
  },
  characterName: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    cssText:
      'text-transform: uppercase; text-align: center; font-weight: bold;',
  },
  dialogue: {
    marginLeft: 20,
    cssText: 'margin-left: 20px;',
  },
});
export default ScreenwritingEditor;
