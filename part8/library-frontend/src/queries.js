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
  query AllBooks{
    allBooks {
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