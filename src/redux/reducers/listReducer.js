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
  SET_POKEMON_SPECIES,
  ADD_POKEMON_TO_FAVOURITES,
  REMOVE_POKEMON_FROM_FAVOURITES
} from '../constants/listConstants'

const initialState = {
  isFetched: false,
  error: null,
  pokemons: [],
  displayedPokemons: [],
  currentPokemon: {},
  favouritePokemons: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS_REQUEST:
      return {
        ...state,
        isFetched: true
      }

    case GET_POKEMONS_SUCCESS:
      return {
        ...state,
        isFetched: false
      }

    case GET_POKEMONS_FAIL:
      return {
        ...state,
        isFetched: false,
        error: action.payload
      }

    case SET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload
      }

    case FILTER_POKEMONS:
      return {
        ...state,
        displayedPokemons: action.payload
      }

    case GET_POKEMON_REQUEST:
      return {
        ...state,
        isFetched: true
      }

    case GET_POKEMON_SUCCESS:
      return {
        ...state,
        isFetched: false
      }

    case GET_POKEMON_FAIL:
      return {
        ...state,
        isFetched: false,
        error: action.payload
      }

    case SET_POKEMON:
      return {
        ...state,
        currentPokemon: action.payload
      }

    case GET_POKEMON_SPECIES_REQUEST:
      return {
        ...state,
        isFetched: true
      }

    case GET_POKEMON_SPECIES_SUCCESS:
      return {
        ...state,
        isFetched: false
      }

    case GET_POKEMON_SPECIES_FAIL:
      return {
        ...state,
        isFetched: false,
        error: action.payload
      }

    case SET_POKEMON_SPECIES:
      return {
        ...state,
        currentPokemon: {
          ...state.currentPokemon,
          pokemonSpecies: action.payload
        }
      }

    case GET_POKEMON_EVOLUTION_CHAIN_REQUEST:
      return {
        ...state,
        isFetched: true
      }

    case GET_POKEMON_EVOLUTION_CHAIN_SUCCESS:
      return {
        ...state,
        isFetched: false
      }

    case GET_POKEMON_EVOLUTION_CHAIN_FAIL:
      return {
        ...state,
        isFetched: false,
        error: action.payload
      }

    case SET_POKEMON_EVOLUTION_CHAIN:
      return {
        ...state,
        currentPokemon: {
          ...state.currentPokemon,
          evolutionChain: action.payload
        }
      }

    case ADD_POKEMON_TO_FAVOURITES:
      return {
        ...state,
        favouritePokemons: [...state.favouritePokemons, action.payload]
      }

    case REMOVE_POKEMON_FROM_FAVOURITES:
      return {
        ...state,
        favouritePokemons: state.favouritePokemons.filter(
          pokemon => pokemon.id !== action.payload
        )
      }
    default:
      return state
  }
}
