import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  content: string;
  date?: string;
  author?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onPress?: () => void;
};

export default function PostItem({ title, content, date, author, onEdit, onDelete, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {date && <Text style={styles.date}>{new Date(date).toLocaleString('pt-BR')}</Text>}
      {author && <Text style={styles.author}>Autor: {author}</Text>}
      <Text>{content}</Text>
      {onEdit && onDelete && (
        <View style={styles.buttons}>
          <Button title="Editar" onPress={onEdit} />
          <Button title="Excluir" color="red" onPress={onDelete} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
    borderRadius: 8,
    elevation: 1,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  date: { fontSize: 12, color: '#666', marginBottom: 4 },
  author: { fontSize: 12, color: '#777', marginBottom: 8 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
});