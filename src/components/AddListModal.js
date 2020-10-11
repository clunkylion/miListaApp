import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../styles/Colors";
import temporalData from "../utils/temporalData";

export default function AddListModal(props) {
  let backgroundColors = [
    "#5CD859",
    "#24A6D9",
    "#595BD9",
    "#8022D9",
    "#D159D8",
    "#D85963",
    "#D88559",
  ];
  const [color, setColor] = useState(backgroundColors[0]);
  const [name, setName] = useState("");

  //crear cuaderno
  const createTodo = () => {
    temporalData.push({
      name: name,
      color: color,
      tasks: [],
    });
    setName("");
    props.closeModal();
  };
  //mostrar botones con colores
  const renderColors = () => {
    return backgroundColors.map((colores) => {
      return (
        <TouchableOpacity
          key={colores}
          style={[styles.colorSelect, { backgroundColor: colores }]}
          onPress={() => changeButtonColor(colores)}
        />
      );
    });
  };
  //cambiar coler según seleccion
  const changeButtonColor = (color) => {
    let selectColor = backgroundColors.indexOf(color);
    setColor(backgroundColors[selectColor]);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        style={{ position: "absolute", top: 64, right: 32 }}
        onPress={props.closeModal}
      >
        <AntDesign name="close" size={24} color={Colors.black} />
      </TouchableOpacity>

      <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
        <Text style={styles.title}>Crear Nueva Lista</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la lista"
          onChangeText={(text) => setName(text)}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          {renderColors()}
        </View>
        <TouchableOpacity
          style={[styles.create, { backgroundColor: color }]}
          onPress={createTodo}
        >
          <Text style={{ color: Colors.white, fontWeight: "600" }}>
            ¡Crear!
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
