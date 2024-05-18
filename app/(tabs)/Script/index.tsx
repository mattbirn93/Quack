import React, { useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
  RichEditor,
  RichToolbar,
  actions,
} from 'react-native-pell-rich-editor';

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

  // Define the actions you want to include in the toolbar
  const toolbarActions = [
    actions.setBold,
    actions.setItalic,
    actions.insertBulletsList,
    actions.insertOrderedList,
    actions.insertLink,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <RichToolbar
        editor={() => richText.current}
        actions={toolbarActions}
        iconMap={
          {
            //   [actions.setBold]: require('./assets/bold.png'),
            //   [actions.setItalic]: require('./assets/italic.png'),
            //   [actions.insertBulletsList]: require('./assets/bullets.png'),
            //   [actions.insertOrderedList]: require('./assets/ordered.png'),
            //   [actions.insertLink]: require('./assets/link.png'),
          }
        }
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
