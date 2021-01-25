import React, { PureComponent } from 'react'
import {
  openPokemonPage,
  addPokemonToFavouriteList,
  removePokemonFromFavouriteList
} from '../redux/actions/listActions'
import { connect } from 'react-redux'
import { FaRegStar } from 'react-icons/fa'

class Pokemon extends PureComponent {
  handleClick() {
    this.props.openPokemonPage(this.props.pokemon)
  }

  handleFavouriteClick() {
    const {
      pokemon,
      addPokemonToFavouriteList,
      removePokemonFromFavouriteList
    } = this.props
    if (!this.isPokemonFavourite()) {
      addPokemonToFavouriteList(pokemon)
    } else {
      removePokemonFromFavouriteList(pokemon)
    }
  }

  isPokemonFavourite = () => {
    const { pokemon, favouritePokemons } = this.props
    return favouritePokemons.some(p => parseInt(p.id) === parseInt(pokemon.id))
  }

  render() {
    const { pokemon } = this.props
    const isPokemonFavourite = this.isPokemonFavourite(pokemon)
    const style = isPokemonFavourite ? { style: { color: 'red' } } : ''

    return (
      <div className="pokemon">
        <div
          className="pokemon__favourite-icon"
          onClick={this.handleFavouriteClick.bind(this)}
        >
          <FaRegStar {...style} />
        </div>
        <div
          className="pokemon__sprite"
          style={{
            backgroundImage: `url(${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              pokemon.id
            }.png`})`,
            cursor: 'pointer'
          }}
          onClick={this.handleClick.bind(this)}
        />
        <p className="pokemon__name">{pokemon.name}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  favouritePokemons: state.list.favouritePokemons
})

const mapDispatchToProps = {
  openPokemonPage,
  addPokemonToFavouriteList,
  removePokemonFromFavouriteList
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pokemon)
