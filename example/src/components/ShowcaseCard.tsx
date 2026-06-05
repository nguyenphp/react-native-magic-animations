import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ShowcaseCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
}

export function ShowcaseCard({ title, description, children, actionButton }: ShowcaseCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <View style={styles.content}>
        {children}
      </View>
      {actionButton && (
        <View style={styles.actionContainer}>
          {actionButton}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B5E20',
  },
  description: {
    fontSize: 12,
    color: '#66bb6a',
    marginTop: 2,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    minHeight: 80,
    backgroundColor: '#F9FBF9',
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F4F0',
    paddingTop: 12,
    alignItems: 'center',
  },
});
