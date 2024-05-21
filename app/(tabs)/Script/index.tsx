// import React, { useRef, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   Button,
// } from 'react-native';
// import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
// import axios from 'axios';
// import io from 'socket.io-client';
// import { yText } from '../../../frontend/src/config/yjsSetup';

// type ContentItem = {
//   type: 'scene-heading' | 'action' | 'character' | 'dialogue';
//   text: string;
// };

// type ScreenwritingEditorProps = {
//   initialContent?: ContentItem[];
// };

// const ScreenwritingEditor: React.FC<ScreenwritingEditorProps> = ({
//   initialContent = [],
// }) => {
//   const [content, setContent] = useState<ContentItem[]>(initialContent);
//   const richText = useRef<RichEditor>(null);

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // useEffect(() => {
//   //   console.log('hit');
//   //   const fetchScenes = async () => {
//   //     try {
//   //       const response = await fetch(
//   //         'http://68.173.116.112:5001/api/Scenes/fetchAllScenes',
//   //       );
//   //       if (!response.ok) {
//   //         throw new Error('Network response was not ok');
//   //       }
//   //       const data = await response.json();
//   //       console.log('Fetched scenes:', data);

//   //       // Assuming data is an array of scenes
//   //       setContent(data);
//   //     } catch (error) {
//   //       console.error('Error fetching scenes:', error);
//   //     }
//   //   };

//   //   fetchScenes();
//   // }, []);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     console.log('BEFORE');
//   //     try {
//   //       const response = await axios.get(
//   //         // 'https://jsonplaceholder.typicode.com/posts',
//   //         // 'http://68.173.116.112:5001/api/scenes/fetchAllScenes',
//   //         // 'http://68.173.116.112:5001/api/Scenes/fetchAllScenes',
//   //         // 'http://localhost:5001/api/scenes',
//   //         'http://45.48.96.63:5001/api/users',
//   //       );
//   //       setData(response.data);
//   //       console.log('RES DATA', response.data);
//   //       setLoading(false);
//   //       console.log('SUCCESS');
//   //     } catch (error) {
//   //       setError(error);w
//   //       setLoading(false);
//   //       console.log('FAILED');
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       console.log('BEFORE');
//       try {
//         const response = await axios.post(
//           'http://192.168.0.211:5001/api/users',
//           {
//             first_name: 'From front end 19',
//             last_name: 'also from front end 19',
//             email: 'frontend19@gmail.com',
//             scripts_id_array: [],
//           },
//         );
//         console.log('SUCCESS');
//         console.log('User added:', response.data);
//       } catch (error) {
//         console.error('Error adding user:', error);
//         console.log('FAILED');
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (richText.current) {
//       const formattedContent = content
//         .map((item) => {
//           switch (item.type) {
//             case 'action':
//               return `<p style="${styles.action.cssText}">${item.text}</p>`;
//             case 'character':
//               return `<p style="${styles.characterName.cssText}">${item.text}</p>`;
//             case 'dialogue':
//               return `<p style="${styles.dialogue.cssText}">${item.text}</p>`;
//             default:
//               return `<p>${item.text}</p>`;
//           }
//         })
//         .join('');
//       richText.current?.setContentHTML(formattedContent);
//     }
//   }, []);

//   const toolbarActions = ['custom-hide-keyboard'];

//   const customIconMap = {
//     'custom-hide-keyboard': () => <Text style={{ fontSize: 20 }}>⬇️</Text>,
//   };

//   const onPressCustomAction = (action: string) => {
//     if (action === 'custom-hide-keyboard') {
//       Keyboard.dismiss();
//     }
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <FlatList
//           data={data}
//           // data={data.slice(0, 1)}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.item}>
//               <Text style={styles.title}>{item.title}</Text>
//               <Text>{item.body}</Text>
//             </View>
//           )}
//         />
//       </View>
//     </>
//     // <SafeAreaView style={styles.container}>

//     //   <RichToolbar />
//     //   <RichEditor ref={richText} style={styles.editor} />
//     // </SafeAreaView>
//   );
// };

/////////////////////////////////////////////////

import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import axios from 'axios';
import io from 'socket.io-client';
import { yText } from '../../../frontend/src/config/yjsSetup';

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
  // Here is the REST API CRUD post request for creating a user named Michael Filoramo
  useEffect(() => {
    const fetchData = async () => {
      console.log('BEFORE');
      try {
        const response = await axios.post(
          'http://192.168.0.211:5001/api/users',
          // 'http://localhost:5001/api/users',
          {
            first_name: 'From front end UseEffect7',
            last_name: 'From front end UseEffect7',
            email: 'From front end UseEffect7@gmail.com',
            scripts_id_array: [],
          },
        );
        console.log('SUCCESS');
        console.log('User added:', response.data);
      } catch (error) {
        console.error('Error adding user:', error);
        console.log('FAILED');
      }
    };

    fetchData();
  }, []);

  // Below here is the web scoket code that seems to be working. I just have to ask Wiggins if he agrees or not.
  const socket = io('http://192.168.0.211:5001'); // Matt/Mike, make sure and change this to your address that works.

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('user_added', (response) => {
    console.log('SUCCESS');
    console.log('User added:', response);
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
    console.log('FAILED');
  });

  // Here is our version of a simple request to add a user to the MONGOLITIS DATABSE YOOOOOOOOOOOOOOOO!!!!!!
  const addUser = () => {
    const data = {
      first_name: 'From front end websockets version6',
      last_name: 'From front end websockets version6',
      email: 'From front end websockets version6@gmail.com',
      scripts_id_array: [],
    };
    socket.emit('add_user', data);
  };

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  // This should end the code for the web sockets logic. Suki agrees and I hope that Wiggins does as well....otherwise we are in bad shape and will have to ask other cats???

  return (
    <View>
      <Text>Toxic Positivity is for Realzzzzzz</Text>
      <Button title="Add User" onPress={addUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    color: 'red',
  },
  body: {
    color: 'red',
  },
  errorText: {
    color: 'red',
  },
});

export default ScreenwritingEditor;

///////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////

// import React, { useRef, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
// import axios from 'axios';
// import io from 'socket.io-client';
// import { yText } from '../../../frontend/src/config/yjsSetup';

// type ContentItem = {
//   type: 'scene-heading' | 'action' | 'character' | 'dialogue';
//   text: string;
// };

// type ScreenwritingEditorProps = {
//   initialContent?: ContentItem[];
// };

// const ScreenwritingEditor: React.FC<ScreenwritingEditorProps> = ({
//   initialContent = [],
// }) => {
//   const editorRef = useRef<RichEditor>(null);

//   // REST API CRUD post request for creating a user named Michael Filoramo
//   useEffect(() => {
//     const fetchData = async () => {
//       console.log('BEFORE');
//       try {
//         const response = await axios.post(
//           'http://192.168.0.211:5001/api/users',
//           {
//             first_name: 'From front end UseEffect2',
//             last_name: 'aFrom front end UseEffect2',
//             email: 'From front end UseEffect2@gmail.com',
//             scripts_id_array: [],
//           },
//         );
//         console.log('SUCCESS');
//         console.log('User added:', response.data);
//       } catch (error) {
//         console.error('Error adding user:', error);
//         console.log('FAILED');
//       }
//     };

//     fetchData();
//   }, []);

//   // WebSocket connection setup
//   const socket = io('http://192.168.0.211:5001');

//   socket.on('connect', () => {
//     console.log('Socket connected');
//   });

//   socket.on('user_added', (response) => {
//     console.log('SUCCESS');
//     console.log('User added:', response);
//   });

//   socket.on('connect_error', (error) => {
//     console.error('Socket connection error:', error);
//     console.log('FAILED');
//   });

//   const addUser = () => {
//     const data = {
//       first_name: 'From front end websockets version2',
//       last_name: 'From front end websockets version2',
//       email: 'From front end websockets version2@gmail.com',
//       scripts_id_array: [],
//     };
//     socket.emit('add_user', data);
//   };

//   useEffect(() => {
//     // Yjs setup for syncing editor content
//     yText.observe((event) => {
//       const text = yText.toString();
//       editorRef.current?.setContentHTML(text);
//     });

//     return () => {
//       yText.unobserve(() => {});
//       socket.disconnect();
//     };
//   }, []);

//   const handleEditorChange = (html: string) => {
//     yText.delete(0, yText.length);
//     yText.insert(0, html);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Toxic Positivity is for Realzzzzzz</Text>
//       <Button title="Add User" onPress={addUser} />
//       <RichEditor
//         ref={editorRef}
//         style={styles.editor}
//         onChange={handleEditorChange}
//       />
//       <RichToolbar editor={editorRef} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 24,
//     color: 'red',
//   },
//   body: {
//     color: 'red',
//   },
//   errorText: {
//     color: 'red',
//   },
//   editor: {
//     flex: 1,
//     alignSelf: 'stretch',
//     marginVertical: 20,
//     backgroundColor: '#f3f3f3',
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//   },
// });

// export default ScreenwritingEditor;
