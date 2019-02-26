import React, { PureComponent } from 'react'

class Pokemon extends PureComponent {
  handleClick() {
    this.props.handleClick(this.props.pokemon)
  }

  render() {
    const { pokemon, handleClick } = this.props

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

export default Pokemon
