import React from 'react';
import fetch from 'isomorphic-fetch';
import render from 'react-dom';
import Error from 'next/error';

class Index extends React.Component {

    static async getInitialProps() {

        let stories;

        try {
            const response = await fetch(
                'http://newsapi.org/v2/top-headlines?' +
                  'country=us&' +
                  'apiKey=176a296f7b7e4f4dba3653765872f6b7'
                );
            
            stories = await response.json();

        } catch (err) {

            console.log(err);
            stories = [];

        }

        return { stories };
    }

    render() {
        const { stories } = this.props;

        if (stories.length === 0) {
            return <Error statusCode={503} />
        }

        return (
            <div>
                <h1>Hacker Next</h1>
                <div>
                    {stories.articles.map(articles => (
                        <h2 key={articles.id}>{articles.title}</h2>
                    ))}
                </div>
            </div>

        )
    }
}

export default Index;