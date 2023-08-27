# NEWS API SERVER
Node.js app to fetch and search news articles

## Postman and Swagger Url -  

- POSTMAN COLLECTION - [POSTMAN](https://api.postman.com/collections/15849394-0e42435d-87ca-4ae2-82a4-7ec50561a73a?access_key=PMAT-01H8SQ7K2QFPN2V0H01JBCYQNP)
- SWAGGER URL - [SWAGGER](https://app.swaggerhub.com/apis/DEVESHSAHU002/NEWS_API/1.0.0)

## Steps to run - 

1. Clone the repo
2. run `npm i`
3. run `npm run start`

## Postman Curls and Responses -

### 1. Fetch N News Articles w/o filters API -
```
curl --location 'http://localhost:3000/news/articles?count=1&country=in&language=en'
```
- Sample response :
```
{
    "articles": [
        {
            "title": "US military aircraft crashes in Australia's Northern Territory during training exercise; 23 onboard",
            "description": "US military aircraft crashes off Northern Territory coast during training exercise. 23 personnel believed to be onboard. Emergency services called for search and medical help. Australian Defence Force not involved.",
            "content": "In a major misshaping, a United States military aircraft crashed off Australia's Northern Territory coast during a training exercise. The aircraft is beliefed to be carrying 23 personnel onboard.\nImmediately after the accident, emergency services wer... [1136 chars]",
            "url": "https://www.livemint.com/news/world/us-military-aircraft-crashes-in-northern-territory-during-training-exercise-23-onboard-11693109886740.html",
            "image": "https://www.livemint.com/lm-img/img/2023/08/27/600x338/Military_Plane_crash_in_USA__1693110405910_1693110406072.jpg",
            "publishedAt": "2023-08-27T04:22:20Z",
            "source": {
                "name": "Mint",
                "url": "https://www.livemint.com"
            }
        }
    ]
}
```

### 2. Search News Articles API -
```
curl --location 'http://localhost:3000/news/search?count=1&country=in&language=en&query=Paresh&search_in=title%2Cdescription%2Ccontent'
```
- Sample response :
```
{
    "result": [
        {
            "title": "Dream Girl 2 Box Office Collection Day 2: Ayushmann Khurrana, Ananya Panday's film mint ₹14 crore",
            "description": "‘Dream Girl 2,’ starring Ayushmann Khurrana, earned ₹24.69 crore in its first two days at the domestic box office. Chandigarh recorded the highest occupancy rate at 56.25%, while Surat had the lowest occupancy rate at 21.25%.",
            "content": "\"Dream Girl 2,\" featuring Ayushmann Khurrana in the primary role, experienced a boost in its domestic box office earnings on the second day of its release, accumulating an impressive ₹14 crore on Saturday.\nAccording to Sacnilk, the film garnered a su... [2008 chars]",
            "url": "https://www.livemint.com/industry/media/dream-girl-2-box-office-collection-day-2-ayushmann-khurrana-ananya-pandays-film-mint-impressive-sum-11693108386366.html",
            "image": "https://www.livemint.com/lm-img/img/2023/08/27/600x338/be1e80fc-7523-11e_1693109752664_1693109752882.png",
            "publishedAt": "2023-08-26T18:30:00Z",
            "source": {
                "name": "Livemint",
                "url": "https://www.livemint.com"
            }
        }
    ]
}
```

### 3. Health Check API (to verify sevice is up) - 
```
curl --location 'http://localhost:3000/news'
```
- Sample response :
```
{
    "status": "OK"
}
```
