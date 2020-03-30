import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Incident() {

  // Estados
  const [incidents, setIncidents] = useState([]) // Casos
  const [total, setTotal] = useState(0) // Total de casos
  const [page, setPage] = useState(1) // Total de páginas
  const [loading, setLoading] = useState(false) // Armazena a informação de dados novos, buscando uma página por vez

  const navigation = useNavigation()

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident })
  }

  // Função que vai carregar os Casos
  async function loadIncidents() {
    // Não carrega Casos se a condição abaixo for true
    if (loading) {
      return
    }

    // Não carrega Casos se a condição abaixo for true
    if (total > 0 && incidents.length === total) {
      return
    }

    // Setta loading pra true
    setLoading(true)

    // Response recebe os Casos e a página a ser inserida em setIncidents()
    const response = await api.get('incidents', {
      params: { page }
    })

    setIncidents([...incidents, ...response.data]) // Spread anexa dois vetores dentro de um único vetor
    setTotal(response.headers['x-total-count']) // Setta a quantidade de casos vindas do back-end
    setPage(page + 1) // Setta o número de páginas
    setLoading(false) // Setta false para loading
  }

  // useEffect() executa loadIncidents assim que a página é renderizada
  useEffect(() => {
    loadIncidents()
  }, [])

  // Renderização
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASOS:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Valor:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
                .format(incident.value)
              }
            </Text>

            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => navigateToDetail(incident)}
              >
                <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={16} color="#e02041" />
              </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}