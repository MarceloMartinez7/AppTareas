import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Text as RNText } from 'react-native';
import uuid from 'react-native-uuid';
import AntDesign from 'react-native-vector-icons/AntDesign'; 

export default function App() {
  const [tarea, setTarea] = useState('');
  const [listaTareas, setListaTareas] = useState([]);

  // Función para agregar tarea
  const agregarTarea = () => {
    if (tarea.length > 0) {
      const tareaNueva = {
        id: uuid.v4(),
        nuevaTarea: tarea,
        completada: false,
      };

      setListaTareas([...listaTareas, tareaNueva]);
      setTarea('');
    }
  };

  // Función para marcar tarea como completada
  const marcarCompletada = (id) => {
    setListaTareas((prevTareas) =>
      prevTareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  // Función para eliminar tarea
  const eliminar = (id) => {
    setListaTareas((prevTareas) => prevTareas.filter((tarea) => tarea.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>App Tareas</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ingresa una tarea"
          style={styles.input}
          value={tarea}
          onChangeText={setTarea}
        />
        <TouchableOpacity style={styles.boton} onPress={agregarTarea}>
          <RNText style={styles.botonTexto}>Add Tarea</RNText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={listaTareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemTareaContainer}>
            <TouchableOpacity onPress={() => marcarCompletada(item.id)} style={styles.tareaContent}>
              <View
                style={[
                  styles.itemTarea,
                  item.completada ? styles.tareaCompletada : styles.tareaNoCompletada,
                ]}
              >
                <Text style={styles.textoTarea}>{item.nuevaTarea}</Text>
                {/* Ícono de eliminar adentro del cuadro de tarea */}
                <AntDesign
                  onPress={() => eliminar(item.id)}
                  name="close"
                  style={styles.iconoEliminar}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    color: '#9e2176',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#9e2176',
    borderWidth: 2,
    padding: 10,
    flex: 1,
    backgroundColor: 'transparent',
    color: '#000',
    height: 40,
  },
  boton: {
    backgroundColor: '#9e2176',
    paddingHorizontal: 15,
    justifyContent: 'center',
    height: 40,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  itemTareaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tareaContent: {
    flexDirection: 'row', // Para alinear el texto y el icono de eliminar
    justifyContent: 'space-between',
    flex: 1,
  },
  itemTarea: {
    padding: 15,
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: 'row', // Permitir que el icono esté alineado en línea con el texto
    justifyContent: 'space-between', // Separar el texto de la tarea del ícono de eliminar
  },
  tareaCompletada: {
    backgroundColor: '#d4edda',
    borderColor: '#28a745',
  },
  tareaNoCompletada: {
    backgroundColor: '#f8d7da',
    borderColor: '#f28b82',
  },
  textoTarea: {
    fontSize: 18,
  },
  iconoEliminar: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    paddingHorizontal: 10,
  },
});
