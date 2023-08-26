type NewsArticle = {
    title: string;
    description: string;
    content: string;
    url: string;
    publishedAt: string;
    source: {
        name: string;
        url: string;
    }
}

type Articles = {
    articles: NewsArticle[];
}