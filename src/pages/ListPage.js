import { connect } from 'react-redux'
import * as listActions from '../redux/actions/listActions'

import React, { Component } from 'react'
import Pokemon from '../components/pokemon'
import Search from '../components/search'

class ListPage extends Component {
  componentDidMount() {
    this.props.getPokemons()
  }

  handleSearch(event) {
    this.props.filterPokemons(event.currentTarget.value)
  }

  render() {
    let { displayedPokemons, isFetched, error } = this.props

    let pokemons = displayedPokemons.map(pokemon => {
      return (
        <li className="pokemons__item" key={pokemon.id}>
          <Pokemon pokemon={pokemon} />
        </li>
      )
    })

    return (
      <div className="list">
        {error && <div className="list__error">{error}</div>}
        <div className="list__search">
          <Search onChange={this.handleSearch.bind(this)} />
        </div>
        {isFetched ? (
          <p>Loading...</p>
        ) : (
          <ul className="pokemons">{pokemons}</ul>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { displayedPokemons, isFetched, error } = state.list

  return {
    displayedPokemons,
    isFetched,
    error
  }
}

const mapDispatchToProps = {
  getPokemons: listActions.getPokemons,
  filterPokemons: listActions.filterPokemons,
  openPokemonPage: listActions.openPokemonPage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPage)
