import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getPokemonData } from '../redux/actions/listActions'
import Pokemon from '../components/pokemon'
import { Link } from 'react-router-dom'

class ItemPage extends PureComponent {
  componentDidMount() {
    this.props.getPokemonData(this.props.match.params.name)
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.name !== prevProps.match.params.name) {
      this.props.getPokemonData(this.props.match.params.name)
    }
  }

  getStats(pokemon) {
    return (
      pokemon.stats &&
      pokemon.stats.map(stat => {
        return (
          <div key={stat.stat.name}>
            <span>{stat.stat.name} </span>: <span>{stat.base_stat}</span>
          </div>
        )
      })
    )
  }

  getEvolutionChainArray(pokemon) {
    if (!pokemon.evolutionChain) {
      return []
    }

    const chain = []
    let child = pokemon.evolutionChain.chain
    while (child) {
      chain.push(child.species)
      child = child.evolves_to ? child.evolves_to[0] : null
    }

    return chain
  }

  getEvolutionForm(pokemon) {
    const evolutionChain = this.getEvolutionChainArray(pokemon)
    return evolutionChain.map(pokemon => {
      pokemon.id = pokemon.url
        .replace('https://pokeapi.co/api/v2/pokemon-species/', '')
        .replace('/', '')

      return <Pokemon key={pokemon.name} pokemon={pokemon} />
    })
  }

  render() {
    const { isFetched, pokemon } = this.props
    const stats = this.getStats(pokemon)
    const evolutionForm = this.getEvolutionForm(pokemon)
    return (
      <div className="pokemon-page">
        {isFetched ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="pokemon-page__header">
              <Pokemon pokemon={pokemon} />
              <div className="pokemon-page__stats">{stats}</div>
            </div>
            <div className="pokemon-page__evolution-form">
              <h3>Evolution Form</h3>
              <div className="pokemon-page__evolution-chain">
                {evolutionForm}
              </div>
            </div>
            <div className="pokemon-page__back-link">
              <Link to="/"> Back to Pokemon List</Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pokemon: state.list.currentPokemon,
  isFetched: state.list.isFetched
})

const mapDispatchToProps = {
  getPokemonData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemPage)
