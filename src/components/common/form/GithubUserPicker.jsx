import React from 'react'
import { Async } from 'react-select'

function getOptions(input) {
  const url = `https://api.github.com/search/users?q=${input}&sort=followers&order=desc`
  return fetch(url)
    .then(response => response.json())
    .then(json => {
      const items = json.items.map(item => ({
        value: item.login,
        label: item.login,
        avatar: item.avatar_url
      }))
      return { options: items }
    });
}

function renderOption(option) {
  const avatarSize = 48
  return (
    <div className="repo-picker-option">
      <div className="first-row">
        <div className="icon">
          <img src={`${option.avatar}&size=${avatarSize}`} alt="icon" width={avatarSize} height={avatarSize}/>
        </div>
        <div className="title">
          <span className="repo-name">{option.label}</span>
        </div>
      </div>
    </div>
  )
}

function renderSelectedOption(option) {
  return (
    <div>{option.value}</div>
  )
}

const GithubUser = React.createClass({
  render() {
    const { field } = this.props
    return (
      <div>
        <Async
          loadOptions={getOptions}
          optionRenderer={renderOption}
          valueRenderer={renderSelectedOption}
          value={field.value}
          name={field.name}
          minimumInput={3}
          onChange={item => {
            field.onChange(item)
          }}
        />
      </div>
    )
  }
})

export default GithubUser