import { useQuery } from '@apollo/client'
import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import { Project } from '../interfaces/Project'
import { GET_PROJECTS } from '../services/query'

const Projects: FC = () => {
  const { data, error, loading } = useQuery(GET_PROJECTS, {
    onCompleted: async data => {
      setProjects(data['getProjects'])
    },
    onError: err => console.log(err),
  })
  const [projects, setProjects] = useState<Project[]>()

  useEffect(() => {}, [projects])

  return (
    <View style={styles.containeur}>
      {projects && (
        <FlatList
          data={projects}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.cardProject}>
                <Text>{item.name}</Text>
              </View>
            )
          }}
        ></FlatList>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  containeur: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  cardProject: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    padding: 10,
    backgroundColor: 'rgb(255,217,109)',
    marginBottom: 20,
    width: 300,
    borderRadius: 10,
  },
})
export default Projects
