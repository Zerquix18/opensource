import React from 'react'
import { Link } from 'react-router-dom'
import { OutboundLink } from 'react-ga'
import GithubAvatar from '~/components/github-avatar/GithubAvatar'
import { languageColor } from '~/utils/colors'

const style = {
  avatar: {
    width: 32,
    height: 32,
    verticalAlign: 'middle',
    marginRight: 16,
  },
  action: {
    display: 'inline-block',
  },
  languages: {
    paddingBottom: 6,
  },
  cardTitle: {
    wordWrap: 'break-word',
  },
  cardAction: {
    whiteSpace: 'initial',
  },
}

const languageStyle = (language) => {
  let color = languageColor(language)
  return {
    display: 'inline-block',
    margin: '0 10px 10px 0',
    color: color.textColor,
    backgroundColor: color.backgroundColor
  }
}

const RepositoryCard = ({repo}) => {
  return (
    <div className="card hoverable">
      <div className="card-content">
        <div className="card-title" style={style.cardTitle}>
          <span style={{ float: 'right' }}>
            <i className="material-icons">star</i>{repo.stargazers}
          </span>
          {repo.position && <strong style={{ marginRight: 20 }}>#{repo.position}</strong>}
          <OutboundLink
            target="_blank"
            eventLabel={repo.url || ''}
            to={repo.url}
          >
            {repo.name}
          </OutboundLink>
        </div>
        <p>{repo.description}</p>
      </div>
      <div className="card-action" style={style.languages}>
        {repo.languages.length === 0
          ? '(no languages)'
          : repo.languages.map((lang, index) => (
            <Link
              style={languageStyle(lang.name)}
              to={`/repositories/${ lang.name }`}
              className="chip"
              key={`${repo.id}-${lang.name}`}
            >{lang.name}</Link>
          ))
        }
      </div>
      <div className="card-action truncate" style={style.cardAction}>
        <OutboundLink
          style={style.action}
          target="_blank"
          eventLabel={repo.user.githubUrl || ''}
          to={repo.user.githubUrl}
        >
          <GithubAvatar
            className="circle"
            style={ style.avatar }
            user={ repo.user }
            size="32"
          />
          {repo.user.name || repo.user.login}
        </OutboundLink>
        <OutboundLink
          style={style.action}
          target="_blank"
          eventLabel={repo.url || ''}
          to={repo.url}
        >
          <i className="material-icons left">link</i>GitHub Project
        </OutboundLink>
      </div>
    </div>
  )
}

export default RepositoryCard
