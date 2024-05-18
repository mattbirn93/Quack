import React, { useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Keyboard, Text } from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

type ContentItem = {
  type: 'scene-heading' | 'action' | 'character' | 'dialogue';
  text: string;
};

type ScreenwritingEditorProps = {
  content?: ContentItem[];
};

const ScreenwritingEditor: React.FC<ScreenwritingEditorProps> = ({
  content = [
    { type: 'scene-heading', text: 'INT. OFFICE - DAY' },
    { type: 'action', text: 'John walks into the room and looks around.' },
    { type: 'character', text: 'JOHN' },
    { type: 'dialogue', text: 'Hello, world!' },
  ],
}) => {
  const richText = useRef<RichEditor>(null);

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
  }, [content]);

  // Define the custom action to hide the keyboard
  const toolbarActions = ['custom-hide-keyboard'];

  // Custom icon and action handling for the toolbar
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
      <RichToolbar
        editor={() => richText.current}
        actions={toolbarActions}
        iconMap={customIconMap}
        onPressAddImage={() => {}}
        onPressAddLink={() => {}}
        onPressCustomAction={onPressCustomAction}
      />
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
