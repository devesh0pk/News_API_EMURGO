import './typings.ts';
import * as CONSTANTS from './constants.ts';
import Express from 'express';
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// CACHE
const articleCache = new Map<string, Map<string, NewsArticle[]>>(); // country, language => result
const articleSearchCache = new Map<string, Map<string, Map<string, Map<string, NewsArticle[]>>>>(); // country, language, search_param, search_in => result

// Listener
app.listen(PORT, () => {
    console.log('Server listening on port :: ' + PORT);
});

// ------------ENDPOINTS------------
// 1. CHECK SERVICE HEALTH
app.get('/news', (request: Express.Request, response: Express.Response) => {
    response.statusCode = 200
    response.send({
        status: "OK"
    })
})

// 2. FETCH N NEWS ARTICLES
app.get('/news/articles', (request: Express.Request, response: Express.Response) => {

    const countOfArticlesParamValue: number = request.query.count ? Math.min((Number)(request.query.count), CONSTANTS.DEFAULT_MAX_ARTICLE_COUNT_VALUE) : CONSTANTS.DEFAULT_MAX_ARTICLE_COUNT_VALUE;
    const languageParamValue: string = request.query.language ? request.query.language + "" : CONSTANTS.DEFAULT_LANGUAGE_VALUE;
    const countryParamValue: string = request.query.country ? request.query.country + "" : CONSTANTS.DEFAULT_COUNTRY_VALUE;
    const modifiedUrl = CONSTANTS.NEWS_API_BASE_URL + CONSTANTS.NEWS_API_TOP_HEADLINES_URL + CONSTANTS.LANG_PARAM + languageParamValue + CONSTANTS.MAX_ARTICLE_COUNT_PARAM + countOfArticlesParamValue + CONSTANTS.COUNTRY_PARAM + countryParamValue + CONSTANTS.API_KEY_PARAM + CONSTANTS.API_KEY_VALUE;

    if (articleCache.has(countryParamValue) &&
        articleCache.get(countryParamValue)!.has(languageParamValue) &&
        articleCache.get(countryParamValue)!.get(languageParamValue)!.length >= countOfArticlesParamValue) {
        // RETURN CACHED RESULT
        console.log("Fetching Articles from Cache")
        response.statusCode = 200;
        response.send({
            articles: articleCache.get(countryParamValue)!.get(languageParamValue)!.slice(0, countOfArticlesParamValue),
        });
    } else {
        console.log("Fetching Articles from Source")
        fetch(modifiedUrl)
            .then((response) => response.json())
            .then((data: Articles) => {
                const allArticles: NewsArticle[] = data.articles;

                // CACHE RESULT
                if (!articleCache.has(countryParamValue)) articleCache.set(countryParamValue, new Map());
                if (!articleCache.get(countryParamValue)!.has(languageParamValue)) articleCache.get(countryParamValue)!.set(languageParamValue, allArticles);

                // FORM RESPONSE
                response.statusCode = 200;
                response.send({
                    articles: allArticles
                });
            }).catch(err => {
                response.statusCode = 500;
                response.send({
                    error: err.message
                })
            })
    }
})

// 3. SEARCH API
app.get('/news/search', (request: Express.Request, response: Express.Response) => {
    const countOfArticlesParamValue: number = request.query.count ? Math.min((Number)(request.query.count), CONSTANTS.DEFAULT_MAX_ARTICLE_COUNT_VALUE) : CONSTANTS.DEFAULT_MAX_ARTICLE_COUNT_VALUE;
    const languageParamValue: string = request.query.language ? request.query.language + "" : CONSTANTS.DEFAULT_LANGUAGE_VALUE;
    const countryParamValue: string = request.query.country ? request.query.country + "" : CONSTANTS.DEFAULT_COUNTRY_VALUE;
    const searchParamValue: string = request.query.query ? request.query.query + "" : CONSTANTS.DEFAULT_QUERY_VALUE;
    let queryParamSearchInValue: string = request.query.search_in ? request.query.search_in + "" : CONSTANTS.DEFAULT_SEARCH_IN_VALUE;
    const searchInArr: string[] = queryParamSearchInValue.split(',');
    for (let str of searchInArr) {
        if (!(str === CONSTANTS.NEWS_ARTICLE_IN.TITLE || str === CONSTANTS.NEWS_ARTICLE_IN.DESCRIPTION || str === CONSTANTS.NEWS_ARTICLE_IN.CONTENT)) {
            queryParamSearchInValue = CONSTANTS.DEFAULT_SEARCH_IN_VALUE;
            break;
        }
    }

    const modifiedUrl = CONSTANTS.NEWS_API_BASE_URL + CONSTANTS.NEWS_API_SEARCH_URL + CONSTANTS.LANG_PARAM + languageParamValue + CONSTANTS.QUERY_PARAM + searchParamValue + CONSTANTS.SEARCH_IN_PARAM + queryParamSearchInValue + CONSTANTS.MAX_ARTICLE_COUNT_PARAM + countOfArticlesParamValue + CONSTANTS.COUNTRY_PARAM + countryParamValue + CONSTANTS.API_KEY_PARAM + CONSTANTS.API_KEY_VALUE;
    if (articleSearchCache.has(countryParamValue) &&
        articleSearchCache.get(countryParamValue)!.has(languageParamValue) &&
        articleSearchCache.get(countryParamValue)!.get(languageParamValue)!.has(searchParamValue) &&
        articleSearchCache.get(countryParamValue)!.get(languageParamValue)!.get(searchParamValue)!.has(queryParamSearchInValue)) {
        // RETURN CACHED RESULT
        console.log("Fetching Search Results from Cache")
        response.statusCode = 200;
        response.send({
            result: articleSearchCache.get(countryParamValue)!.get(languageParamValue)!.get(searchParamValue)!.get(queryParamSearchInValue)
        })
    } else {
        console.log("Fetching Search Results from Source")
        fetch(modifiedUrl)
            .then((response) => response.json())
            .then((data: Articles) => {
                const searchedArticles: NewsArticle[] = data.articles;

                // CACHE RESULT
                if (!articleSearchCache.has(countryParamValue)) articleSearchCache.set(countryParamValue, new Map());
                if (!articleSearchCache.get(countryParamValue)!.has(languageParamValue)) articleSearchCache.get(countryParamValue)!.set(languageParamValue, new Map());
                if (!articleSearchCache.get(countryParamValue)!.get(languageParamValue)!.has(searchParamValue)) articleSearchCache.get(countryParamValue)!.get(languageParamValue)!.set(searchParamValue, new Map());
                if (!articleSearchCache.get(countryParamValue)!.get(languageParamValue)!.get(searchParamValue)!.has(queryParamSearchInValue)) articleSearchCache.get(countryParamValue)!.get(languageParamValue)!.get(searchParamValue)!.set(queryParamSearchInValue, searchedArticles);

                // FORM RESPONSE
                response.statusCode = 200;
                response.send({
                    result: searchedArticles
                });
            }).catch(err => {
                response.statusCode = 500;
                response.send({
                    error: err.message
                })
            })
    }
})