import {
  GET_POKEMONS_REQUEST,
  GET_POKEMONS_SUCCESS,
  GET_POKEMONS_FAIL,
  SET_POKEMONS,
  FILTER_POKEMONS,
  GET_POKEMON_REQUEST,
  GET_POKEMON_SUCCESS,
  GET_POKEMON_FAIL,
  SET_POKEMON,
  GET_POKEMON_EVOLUTION_CHAIN_FAIL,
  GET_POKEMON_EVOLUTION_CHAIN_SUCCESS,
  GET_POKEMON_EVOLUTION_CHAIN_REQUEST,
  SET_POKEMON_EVOLUTION_CHAIN,
  GET_POKEMON_SPECIES_REQUEST,
  GET_POKEMON_SPECIES_SUCCESS,
  GET_POKEMON_SPECIES_FAIL,
  SET_POKEMON_SPECIES
} from '../constants/listConstants'
import { push } from 'connected-react-router'

function setPokemons(data) {
  const pokemons = data.results.map(pokemon => {
    let { url } = pokemon
    pokemon.id = url.substring(34, url.length - 1)

    return pokemon
  })

  return {
    type: SET_POKEMONS,
    payload: pokemons
  }
}

export function getPokemons() {
  return dispatch => {
    dispatch({
      type: GET_POKEMONS_REQUEST
    })

    return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=784`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error(`${response.status}: ${response.statusText}`)
      })
      .then(data => {
        dispatch({
          type: GET_POKEMONS_SUCCESS
        })
        dispatch(setPokemons(data))
        dispatch(filterPokemons())
      })
      .catch(error => {
        dispatch({
          type: GET_POKEMONS_FAIL,
          payload: error.message
        })
      })
  }
}

export function filterPokemons(searchString = '') {
  return (dispatch, getState) => {
    const displayedPokemons = getState().list.pokemons.filter(pokemon => {
      return pokemon.name.includes(searchString.toLowerCase())
    })

    dispatch({
      type: FILTER_POKEMONS,
      payload: displayedPokemons
    })
  }
}

export function openPokemonPage(pokemon) {
  return dispatch => {
    dispatch(push(`/pokemon/${pokemon.name}`))
  }
}

export function getPokemonData(pokemonName) {
  return (dispatch, getState) => {
    dispatch(getPokemon(pokemonName))
      .then(() => dispatch(getPokemonSpecies(pokemonName)))
      .then(() => {
        const pokemon = getState().list.currentPokemon
        dispatch(
          getPokemonEvolutionForm(pokemon.pokemonSpecies.evolution_chain.url)
        )
      })
  }
}

function getPokemon(pokemonName) {
  return (dispatch, getState) => {
    dispatch({
      type: GET_POKEMON_REQUEST
    })

    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error(`${response.status}: ${response.statusText}`)
      })
      .then(data => {
        dispatch({
          type: GET_POKEMON_SUCCESS
        })
        dispatch({ type: SET_POKEMON, payload: data })
      })
      .catch(error => {
        dispatch({
          type: GET_POKEMON_FAIL,
          payload: error.message
        })
      })
  }
}

function getPokemonSpecies(pokemonName) {
  return (dispatch, getState) => {
    dispatch({
      type: GET_POKEMON_SPECIES_REQUEST
    })

    return fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error(`${response.status}: ${response.statusText}`)
      })
      .then(data => {
        dispatch({
          type: GET_POKEMON_SPECIES_SUCCESS
        })
        dispatch({ type: SET_POKEMON_SPECIES, payload: data })
      })
      .catch(error => {
        dispatch({
          type: GET_POKEMON_SPECIES_FAIL,
          payload: error.message
        })
      })
  }
}

function getPokemonEvolutionForm(url) {
  return (dispatch, getState) => {
    dispatch({
      type: GET_POKEMON_EVOLUTION_CHAIN_REQUEST
    })

    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error(`${response.status}: ${response.statusText}`)
      })
      .then(data => {
        dispatch({
          type: GET_POKEMON_EVOLUTION_CHAIN_SUCCESS
        })
        dispatch({ type: SET_POKEMON_EVOLUTION_CHAIN, payload: data })
      })
      .catch(error => {
        dispatch({
          type: GET_POKEMON_EVOLUTION_CHAIN_FAIL,
          payload: error.message
        })
      })
  }
}
