import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../styles/Colors";
export default function TodoModal(props) {
  const [name, setName] = useState(props.list.name);
  const [color, setColor] = useState(props.list.color);
  const [task, setTask] = useState(props.list.tasks);
  const taskCount = task.length;
  const completedTaskCount = task.filter((task) => task.completed).length;
  const renderTask = (task) => {
    return (
      <View style={styles.taskContainer}>
        <TouchableOpacity>
          <Ionicons
            name={task.completed ? "ios-square" : "ios-square-outline"}
            size={24}
            color={colors.gray}
            style={{ width: 32 }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.task,
            {
              textDecorationLine: task.completed ? "line-through" : "none",
              color: task.completed ? colors.gray : colors.black,
            },
          ]}
        >
          {task.title}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={props.closeModal}
        style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
      >
        <AntDesign name="close" size={24} color={colors.black} />
      </TouchableOpacity>
      <View
        style={[styles.section, styles.header, { borderBottomColor: color }]}
      >
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.taskCount}>
          {completedTaskCount} de {taskCount} tareas completadas
        </Text>
      </View>
      <View style={[styles.section, { flex: 3 }]}>
        <FlatList
          data={task}
          renderItem={({ item }) => renderTask(item)}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <KeyboardAvoidingView
        style={[styles.section, styles.footer]}
        behavior="padding"
      >
        <TextInput style={[styles.input, { borderColor: color }]} />
        <TouchableOpacity style={[styles.addTask, { backgroundColor: color }]}>
          <AntDesign name="plus" size={16} color={colors.white} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontWeight: "800",
    fontSize: 30,
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: "800",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTask: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  taskContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  task: {
    color: colors.black,
    fontWeight: "800",
    fontSize: 16,
  },
});
