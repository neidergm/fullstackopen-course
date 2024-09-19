import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
query AllAuthors{
    allAuthors {
        name
        born
        bookCount
        id
    }
}
`;

export const ALL_BOOKS = gql`
  query AllBooks($genre: String){
    allBooks(genre: $genre) {
        title
        author
        published
        genres
    }
}
`
export const RECOMMENDATIONS_FOR_FAVORITE_GENRE = gql`
  query RecommendationsForFavoriteGenre($genre: String! = "recommended"){
    allBooks(genre: $genre) {
        title
        author
        published
    }
}
`

export const ADD_BOOK = gql`
    mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ){
            id
            title
            author
            published
            genres
        }
    }
` 

export const UPDATE_BIRTHYEAR = gql`
    mutation EditAuthor($name: String!, $born: Int!) {
        editAuthor(
            name: $name
            born: $born
        ) {
            name
            born
            bookCount
            id
        }
    }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query Me {
    me {
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
    }
  }
`
