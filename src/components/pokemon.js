import React, { PureComponent } from 'react'
import { openPokemonPage } from '../redux/actions/listActions'
import { connect } from 'react-redux'

class Pokemon extends PureComponent {
  handleClick() {
    this.props.openPokemonPage(this.props.pokemon)
  }

  render() {
    const { pokemon } = this.props

    return (
      <div className="pokemon">
        <button
          type="button"
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

const mapDispatchToProps = {
  openPokemonPage
}

export default connect(
  null,
  mapDispatchToProps
)(Pokemon)
