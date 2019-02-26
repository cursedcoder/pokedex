import React, { Component, Fragment } from 'react'
import Pokemon from '../components/pokemon'
import { connect } from 'react-redux'
import cn from 'classnames'

class Sidebar extends Component {
  state = {
    isSidebarHidden: true
  }

  handleClick = () => {
    this.setState({ isSidebarHidden: !this.state.isSidebarHidden })
  }

  render() {
    const { pokemons } = this.props
    const className = cn('sidebar', {
      'sidebar--visible': !this.state.isSidebarHidden
    })
    return (
      <Fragment>
        <div className="sidebar__button">
          <button onClick={this.handleClick}>
            {this.state.isSidebarHidden ? 'Show' : 'Hide'} Sidebar
          </button>
        </div>
        <div className={className}>
          {pokemons &&
            pokemons.map(pokemon => (
              <Pokemon key={pokemon.id} pokemon={pokemon} />
            ))}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({ pokemons: state.list.favouritePokemons })

export default connect(mapStateToProps)(Sidebar)
