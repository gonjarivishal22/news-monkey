import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [totalResults, setTotalResults] = useState(0)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    const updateData = async () => {
        props.showProgress(10)
        setLoading(true)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country
            }&category=${props.category
            }&apiKey=${props.apiKey}&page=${page
            }&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        props.showProgress(50)
        let parsedData = await data.json();
        props.showProgress(70)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.showProgress(100)
    }

    useEffect(() => {
        document.title = `NewsMonkey-${props.category}`
        updateData()
        //eslint-disable-next-line
    }, [])

    const handleNext = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country
            }&category=${props.category
            }&apiKey=${props.apiKey}&page=${page + 1
            }&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        setPage(page + 1)
    }

    const fetchMoreData = async () => {
        handleNext()

    };
    // handlePrev = async () => {
    //     this.setState({ page: this.state.page - 1, }, this.updateData);
    // };

    return (
        <>
            <h1 className="text-center" style={{ margin: "70px 0px 0px" }}>
                NewsMonkey - Top Headlines
            </h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >   <div className="container my-2">
                    <div className="row">
                        {
                            articles.map((element) => {
                                return (
                                    <div className="col-md-4" key={element.url}>
                                        <NewsItem
                                            title={element.title ? element.title.split(0, 45) : ""}
                                            description={
                                                element.description
                                                    ? element.description.split(0, 88)
                                                    : ""
                                            }
                                            imageUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source.name}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                    <button
                        disabled={this.state.page <= 1}
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handlePrev}
                    >
                        &larr;Previous
                    </button>
                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handleNext}
                        disabled={
                            this.state.page + 1 >
                            Math.ceil(this.state.totalResults / this.props.pageSize)
                        }
                    >
                        Next &rarr;
                    </button>
                </div> */}
        </>
    );
}


export default News;

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};
News.defaultProps = { country: "in", pageSize: 8, category: "general" };
