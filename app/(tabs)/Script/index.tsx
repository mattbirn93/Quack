import React, { useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

type ContentItem = {
  type: 'scene-heading' | 'action' | 'character' | 'dialogue';
  text: string;
};

type ScreenwritingEditorProps = {
  content: ContentItem[];
};

const ScreenwritingEditor: React.FC<ScreenwritingEditorProps> = ({
  content,
}) => {
  const richText = useRef<RichEditor>(null);

  useEffect(() => {
    if (richText.current) {
      const formattedContent = content
        .map((item: any) => {
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
  }, [content]);

  return (
    <SafeAreaView style={styles.container}>
      <RichToolbar editor={richText} />
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
