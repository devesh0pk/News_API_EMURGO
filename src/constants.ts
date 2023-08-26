import './typings.ts';
const dotenv = require('dotenv').config();
// DEFAULT VALUES
const API_KEY_VALUE: string = dotenv.parsed.GNEWS_API_KEY;
const NEWS_API_BASE_URL: string = dotenv.parsed.GNEWS_API_BASE_URL;
const NEWS_API_TOP_HEADLINES_URL: string = dotenv.parsed.GNEWS_API_TOP_HEADLINES_URL;
const NEWS_API_SEARCH_URL: string = dotenv.parsed.GNEWS_API_SEARCH_URL;
const DEFAULT_MAX_ARTICLE_COUNT_VALUE: number = 10;
const DEFAULT_COUNTRY_VALUE: string = "us";
const DEFAULT_QUERY_VALUE: string = "example";
const DEFAULT_LANGUAGE_VALUE: string = "en";
const DEFAULT_SEARCH_IN_VALUE: string = "title,description,content";

const QUERY_PARAM: string = "&q="
const MAX_ARTICLE_COUNT_PARAM: string = "&max=";
const COUNTRY_PARAM: string = "&country=";
const API_KEY_PARAM: string = "&apikey=";
const SEARCH_IN_PARAM: string = "&in=";
const LANG_PARAM: string = "?lang=";

// NEWS SEARCH IN ENUM
const NEWS_ARTICLE_IN = {
    TITLE: "title",
    DESCRIPTION: "description",
    CONTENT: "content",
}

export {
    API_KEY_VALUE,
    NEWS_API_BASE_URL,
    NEWS_API_TOP_HEADLINES_URL,
    NEWS_API_SEARCH_URL,
    DEFAULT_MAX_ARTICLE_COUNT_VALUE,
    DEFAULT_COUNTRY_VALUE,
    DEFAULT_QUERY_VALUE,
    DEFAULT_LANGUAGE_VALUE,
    DEFAULT_SEARCH_IN_VALUE,
    QUERY_PARAM,
    MAX_ARTICLE_COUNT_PARAM,
    COUNTRY_PARAM,
    API_KEY_PARAM,
    SEARCH_IN_PARAM,
    LANG_PARAM,
    NEWS_ARTICLE_IN
}