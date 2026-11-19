import React, { useState, useRef, useMemo, useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    FlatList,
    Modal,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export default function ModalScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [priority, setPriority] = useState('Media');

    const bottomSheetRef = useRef(null);
    const newTaskInputRef = useRef(null);
    const nextTaskId = useRef(1);
    const snapPoints = useMemo(() => ['35%', '55%'], []);

    const openBottomSheet = useCallback(() => {
        bottomSheetRef.current?.snapToIndex(0);
    }, []);

    const saveTask = () => {
        const taskName = task.trim();
        if (taskName === '') {
            return;
        }

        setTasks((currentTasks) => [
            ...currentTasks,
            {
                id: nextTaskId.current++,
                name: taskName,
                priority,
            },
        ]);
        setTask('');
        setModalVisible(false);
    };

    const selectPriority = (selectedPriority) => {
        setPriority(selectedPriority);
        bottomSheetRef.current?.close();
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.addButtonText}>Agregar tarea</Text>
                </Pressable>

                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.task}>
                            <Text style={styles.taskName}>{item.name}</Text>
                            <Text style={styles.priority}>{item.priority}</Text>
                        </View>
                    )}
                />

                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <Pressable
                        style={styles.modalOverlay}
                        onPress={() => setModalVisible(false)}
                    >
                        <Pressable style={styles.modalContent} onPress={() => {}}>
                            <Text style={styles.title}>Nueva tarea</Text>
                            <TextInput
                                ref={newTaskInputRef}
                                style={styles.input}
                                value={task}
                                onChangeText={setTask}
                                placeholder="Nombre de la tarea"
                                onSubmitEditing={saveTask}
                            />
                            <Pressable style={styles.saveButton} onPress={saveTask}>
                                <Text style={styles.saveButtonText}>Guardar</Text>
                            </Pressable>
                            <Pressable style={styles.priorityButton} onPress={openBottomSheet}>
                                <Text>Prioridad: {priority}</Text>
                            </Pressable>
                        </Pressable>
                    </Pressable>
                </Modal>

                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    enablePanDownToClose
                >
                    <BottomSheetView style={styles.bottomSheetContent}>
                        <Text style={styles.title}>Seleccionar prioridad</Text>
                        {['Alta', 'Media', 'Baja'].map((option) => (
                            <Pressable
                                key={option}
                                style={styles.priorityOption}
                                onPress={() => selectPriority(option)}
                            >
                                <Text>{option}</Text>
                            </Pressable>
                        ))}
                    </BottomSheetView>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    addButton: {
        backgroundColor: '#2563eb',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    task: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    taskName: {
        fontSize: 16,
    },
    priority: {
        color: '#666',
        marginTop: 4,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
    },
    saveButton: {
        backgroundColor: '#2563eb',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    priorityButton: {
        padding: 12,
        marginTop: 8,
        alignItems: 'center',
    },
    bottomSheetContent: {
        flex: 1,
        padding: 16,
    },
    priorityOption: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});
