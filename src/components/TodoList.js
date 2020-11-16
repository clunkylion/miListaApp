import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import Colors from "../styles/Colors";
import TodoModal from "./TodoModal";
export default TodoList = (props) => {
  const [showList, setShowList] = useState(false);
  const completedCount = props.list.tasks.filter((task) => task.completed)
    .length;
  const remainingCount = props.list.tasks.length - completedCount;
  return (
    <View>
      <Modal
        animationType="slide"
        visible={showList === true}
        onRequestClose={() => setShowList(false)}
      >
        <TodoModal list={props.list} closeModal={() => setShowList(false)} />
      </Modal>
      <TouchableOpacity
        onPress={() => setShowList(true)}
        style={[styles.listContainer, { backgroundColor: props.list.color }]}
      >
        <Text style={styles.listTitle} numberOfLines={1}>
          {props.list.name}
        </Text>
        <View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subtitle}>Pendientes</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subtitle}>Completadas</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 16,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: Colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.white,
  },
});
