import React from 'react';
import PropTypes from 'prop-types';
import { TwitterIcon, LinkedinIcon } from 'react-share';
import { authorSocialLinks } from './../../../content/meta/config';
import { FaArrowDown } from 'react-icons/fa/';
import Github from './../../images/svg-icons/github.svg';

const Hero = props => {
  const { scrollToContent, backgrounds, theme } = props;
  const iconSize = 36;

  return (
    <React.Fragment>
      <section className="hero">
        <h1>
          <strong>David Asaf</strong>
        </h1>
        <h2>A Software Engineer in Charlotte, NC</h2>
        <button onClick={scrollToContent} aria-label="scroll">
          <FaArrowDown />
        </button>
        <div className="social-links">
          <a href={authorSocialLinks.twitter} target="_blank" className="social-container">
            <TwitterIcon round size={iconSize} className="test" />
          </a>
          <a href={authorSocialLinks.linkedIn} target="_blank" className="social-container">
            <LinkedinIcon round size={iconSize} />
          </a>
          <a href={authorSocialLinks.github} target="_blank" className="social-container">
            <Github height="36" width="36" style={{ borderRadius: '2em', backgroundColor: 'white' }} />
          </a>
        </div>
      </section>

      {/* --- STYLES --- */}
      <style jsx>{`
        .social-links {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1em;

          a {
            width: 36px;
            height: 36px;
          }

          :global(.social-container) {
            margin: 0em 0.8em;
            cursor: pointer;
          }
        }

        .hero {
          align-items: center;
          background: ${theme.hero.background};
          background-image: url(${backgrounds.mobile});
          background-size: cover;
          color: ${theme.text.color.primary.inverse};
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          min-height: 100vh;
          height: 100px;
          padding: ${theme.space.inset.l};
          padding-top: ${theme.header.height.homepage};
          padding-bottom: 15rem;
        }

        h1 {
          text-align: center;
          font-size: ${theme.hero.h1.size};
          margin: ${theme.space.stack.l};
          color: ${theme.hero.h1.color};
          line-height: ${theme.hero.h1.lineHeight};
          text-remove-gap: both 0 'Open Sans';

          :global(strong) {
            position: relative;

            &::after,
            &::before {
              content: '›';
              color: ${theme.text.color.attention};
              margin: 0 ${theme.space.xs} 0 0;
              text-shadow: 0 0 ${theme.space.s} ${theme.color.neutral.gray.k};
            }
            &::after {
              content: '‹';
              margin: 0 0 0 ${theme.space.xs};
            }
          }
        }
        h2 {
          text-align: center;
          font-size: ${theme.hero.h1.size};
          margin: ${theme.space.stack.l};
          color: ${theme.hero.h1.color};
          line-height: ${theme.hero.h1.lineHeight};
        }

        button {
          background: ${theme.background.color.brand};
          border: 0;
          border-radius: 50%;
          font-size: ${theme.font.size.m};
          padding: ${theme.space.s} ${theme.space.m};
          cursor: pointer;
          width: ${theme.space.xl};
          height: ${theme.space.xl};

          &:focus {
            outline-style: none;
            background: ${theme.color.brand.primary.active};
          }

          :global(svg) {
            position: relative;
            top: 5px;
            fill: ${theme.color.neutral.white};
            stroke-width: 40;
            stroke: ${theme.color.neutral.white};
            animation-duration: ${theme.time.duration.long};
            animation-name: buttonIconMove;
            animation-iteration-count: infinite;
          }
        }

        @keyframes buttonIconMove {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @from-width tablet {
          .hero {
            background-image: url(${backgrounds.tablet});
          }

          h1 {
            max-width: 90%;
            font-size: ${`calc(${theme.hero.h1.size} * 1.3)`};
          }

          button {
            font-size: ${theme.font.size.l};
          }
        }

        @from-width desktop {
          .hero {
            background-image: url(${backgrounds.desktop});
          }

          h1 {
            max-width: 80%;
            font-size: ${`calc(${theme.hero.h1.size} * 1.5)`};
          }

          button {
            font-size: ${theme.font.size.xl};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Hero.propTypes = {
  scrollToContent: PropTypes.func.isRequired,
  backgrounds: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Hero;
