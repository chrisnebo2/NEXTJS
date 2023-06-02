function NewsCategory({ articles, category }) {
    return (
        <>
            <h1>
                News Articles for {category} Category
            </h1>
            {
                articles.map(article => (
                    <div key={article.id}>
                        <h2>
                            {article.id}. {article.title} | {article.category}
                        </h2>
                        <p>{article.description}</p>
                        <hr />
                    </div>
                ))
            }
        </>
    )
}

export default NewsCategory

export async function getServerSideProps({ params, req, res }) {

    console.log(req.headers);
    const category = params.category
    res.setHeader('Set-Cookie', ['name=Christian'])

    const response = await fetch(`http://localhost:4000/news?category=${category}`)
    const data = await response.json()

    if(data.length === 0) {
        return {
            notFound: true
        }
    }
    
    return {
        props: {
            articles: data,
            category: category
        }
    }
}