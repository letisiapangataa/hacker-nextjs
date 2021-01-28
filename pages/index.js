import React from 'react';
import fetch from 'isomorphic-fetch';
import render from 'react-dom';
import Error from 'next/error';
import StoryList from '../components/StoryList';
import Layout from '../components/Layout';
import Link from 'next/link';

class Index extends React.Component {

    static async getInitialProps({ req, res, query }) {

        let stories;
        let page;

        try {
            page = Number(query.page) || 1;
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

        return { page, stories };
    }

    render() {
        const { stories, page } = this.props;

        if (stories.length === 0) {
            return <Error statusCode={503} />
        }

        return (
            <Layout title="Hacker Next" description="Hacker News clone made with Next.js">
                <StoryList stories={stories} />

                <footer>
                    <Link href={`?page=${page + 1}`}>
                        <a>Click here</a>
                    </Link>
                </footer>

            </Layout>
        );
    }
}

export default Index;