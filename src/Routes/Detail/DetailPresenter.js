import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "styled-components";
import Loader from "../../Components/Loader";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 30px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 25px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Btn = styled.button`
  margin: 5px;
  background-color: #e8b708;
  border: 1px solid black;
  border-radius: 5px;
  font-weight: 600;

  ${props =>
    props.isIMDB
      ? ""
      : "opacity: 0.65; cursor: not-allowed; & a{pointer-events:none;}"}
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const LinkGroup = styled.div`
  display: flex;
  margin-bottom: 25px;
`;

const ListItem = styled.span`
  margin-top: 25px;
  padding: 10px;
  ${props =>
    props.clicked ? "border-bottom: 2px solid white;" : "transparent"}
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center center;
  height: 100%;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center center;
  filter: blur(2px);
  opacity: 0.5;
`;

const TrailerContainer = styled.div`
  & a {
    display: block;
    margin-bottom: 10px;
    font-size: 15px;
  }
`;

const AboutContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 60vw;
  align-items: flex-end;
  margin: 15px;

  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin: 10px 25px;

    & img {
      margin-bottom: 20px;
    }
  }
`;

const DetailPresenter = withRouter(
  ({ location: { pathname }, result, error, loading }) =>
    loading ? (
      <>
        <Helmet>
          <title>Loading | React MovieApp</title>
        </Helmet>
        <Loader />
      </>
    ) : (
      <Container>
        <Helmet>
          <title>
            {result.title ? result.title : result.name} | React MovieApp
          </title>
        </Helmet>

        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : "X"
            }
          />
          <Data>
            <Title>{result.title ? result.title : result.name}</Title>
            <ItemContainer>
              <Item>
                {result.release_date
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date.substring(0, 4)}
              </Item>
              <Divider>*</Divider>
              <Item>
                {result.runtime ? result.runtime : result.episode_run_time[0]}{" "}
                min
              </Item>
              <Divider>*</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
              </Item>
              <Btn isIMDB={result.imdb_id}>
                <a
                  href={`https://www.imdb.com/title/${result.imdb_id}`}
                  title="link to IMDB"
                >
                  IMDb
                </a>
              </Btn>
            </ItemContainer>
            <Overview>{result.overview}</Overview>
            <LinkGroup>
              <ListItem
                clicked={
                  pathname ===
                  `${
                    pathname.split("/")[1].includes("movie")
                      ? `/movie/${result.id}/trailer`
                      : `/tv/${result.id}/trailer`
                  }`
                }
              >
                <Link
                  to={`${
                    pathname.split("/")[1].includes("movie")
                      ? `/movie/${result.id}/trailer`
                      : `/tv/${result.id}/trailer`
                  }`}
                >
                  Trailer
                </Link>
              </ListItem>
              <ListItem
                clicked={
                  pathname ===
                  `${
                    pathname.split("/")[1].includes("movie")
                      ? `/movie/${result.id}/about_production`
                      : `/tv/${result.id}/about_production`
                  }`
                }
              >
                <Link
                  to={`${
                    pathname.split("/")[1].includes("movie")
                      ? `/movie/${result.id}/about_production`
                      : `/tv/${result.id}/about_production`
                  }`}
                >
                  About Production
                </Link>
              </ListItem>
              {pathname.includes(`/tv/${result.id}`) ? (
                <ListItem
                  clicked={
                    pathname ===
                    `${
                      pathname.split("/")[1].includes("movie")
                        ? `/movie/${result.id}/Seasons`
                        : `/tv/${result.id}/Seasons`
                    }`
                  }
                >
                  <Link
                    to={`${
                      pathname.split("/")[1].includes("movie")
                        ? `/movie/${result.id}/Seasons`
                        : `/tv/${result.id}/Seasons`
                    }`}
                  >
                    Seasons
                  </Link>
                </ListItem>
              ) : (
                ""
              )}
            </LinkGroup>
            <Route
              path="/movie/:id/trailer"
              exact
              component={() => {
                const {
                  videos: { results: trailers }
                } = result;

                return (
                  <TrailerContainer>
                    {trailers.map((trailer, index) =>
                      trailer.key ? (
                        <a
                          key={index + 1}
                          href={`https://www.youtube.com/watch?v=${trailer.key}`}
                        >
                          #{index + 1} {trailer.name}
                        </a>
                      ) : (
                        "No trailer..."
                      )
                    )}
                  </TrailerContainer>
                );
              }}
            />
            <Route
              path="/movie/:id/about_production"
              exact
              component={() => {
                const {
                  production_companies: companies,
                  production_countries: countries
                } = result;
                return (
                  <>
                    <Title>Production Companies</Title>
                    <AboutContainer>
                      {companies.map(company => (
                        <div>
                          <img
                            src={`https://image.tmdb.org/t/p/w92/${company.logo_path}`}
                            alt={company.name}
                          />
                          <span>{company.name}</span>
                        </div>
                      ))}
                    </AboutContainer>
                    <Title>Production Contries</Title>
                    {countries.map(country => (
                      <li>{country.name}</li>
                    ))}
                  </>
                );
              }}
            />

            <Route
              path="/tv/:id/trailer"
              exact
              component={() => {
                const {
                  videos: { results: trailers }
                } = result;
                console.log(trailers);

                return (
                  <TrailerContainer>
                    {trailers.map((trailer, index) =>
                      trailer.key ? (
                        <a
                          key={index + 1}
                          href={`https://www.youtube.com/watch?v=${trailer.key}`}
                        >
                          #{index + 1} {trailer.name}
                        </a>
                      ) : (
                        "No trailer..."
                      )
                    )}
                  </TrailerContainer>
                );
              }}
            />
            <Route
              path="/tv/:id/about_production"
              exact
              component={() => {
                const { networks, production_companies: companies } = result;
                return (
                  <>
                    <Title>Networks</Title>
                    {networks ? (
                      <AboutContainer>
                        {networks.map(network => (
                          <div>
                            <img
                              src={`https://image.tmdb.org/t/p/w92/${network.logo_path}`}
                              alt={network.name}
                            />
                            <span>{network.name}</span>
                          </div>
                        ))}
                      </AboutContainer>
                    ) : (
                      "No Networks..."
                    )}
                    <Title>Production Companies</Title>
                    {companies ? (
                      <AboutContainer>
                        {companies.map(company => (
                          <div>
                            <img
                              src={`https://image.tmdb.org/t/p/w92/${company.logo_path}`}
                              alt={company.name}
                            />
                            <span>{company.name}</span>
                          </div>
                        ))}
                      </AboutContainer>
                    ) : (
                      "No Companies.."
                    )}
                  </>
                );
              }}
            />
            <Route
              path="/tv/:id/Seasons"
              exact
              component={() => {
                const { seasons } = result;
                return seasons ? (
                  <AboutContainer>
                    {seasons.map(season => (
                      <div>
                        <img
                          src={`https://image.tmdb.org/t/p/w92/${season.poster_path}`}
                          alt={season.name}
                        />
                        <span>{season.name}</span>
                      </div>
                    ))}
                  </AboutContainer>
                ) : (
                  "No Seasons...."
                );
              }}
            />
          </Data>
        </Content>
      </Container>
    )
);

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default DetailPresenter;
