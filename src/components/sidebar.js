import React, { Component, Fragment } from 'react'
import Pokemon from '../components/pokemon'
import { connect } from 'react-redux'

class Sidebar extends Component {
  state = {
    isSidebarHidden: true
  }

  handleClick = () => {
    this.setState({ isSidebarHidden: !this.state.isSidebarHidden })
  }

  render() {
    const { pokemons } = this.props
    return (
      <Fragment>
        <div className="sidebar__button">
          <button onClick={this.handleClick}>
            {this.state.isSidebarHidden ? 'Show' : 'Hide'} Sidebar
          </button>
        </div>
        {!this.state.isSidebarHidden && (
          <div className="sidebar">
            {pokemons &&
              pokemons.map(pokemon => (
                <Pokemon key={pokemon.id} pokemon={pokemon} />
              ))}
          </div>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({ pokemons: state.list.favouritePokemons })

export default connect(mapStateToProps)(Sidebar)
