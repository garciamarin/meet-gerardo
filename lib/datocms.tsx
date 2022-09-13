import { GraphQLClient } from "graphql-request";

type RequestProps = {
  query: string
  variables?: object
  includeDrafts?: string
  excludeInvalid?: string
}

export function request({ query, variables, includeDrafts , excludeInvalid }: RequestProps) {
  
  const URL = 'https://graphql.datocms.com';

  type Headers = {
    authorization: string
    'X-Include-Drafts'?: string 
    'X-Exclude-Invalid'?: string
  }

  const headers: Headers = {
    authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
  };

  if (includeDrafts) {
    headers['X-Include-Drafts'] = 'true';
  }
  if (excludeInvalid) {
    headers['X-Exclude-Invalid'] = 'true';
  }

  const client = new GraphQLClient(URL , { headers });
  
  return client.request(query, variables);
}




// export function request({ query, variables, includeDrafts , excludeInvalid }) {
//   const headers = {
//     authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
//   };
//   if (includeDrafts) {
//     headers['X-Include-Drafts'] = 'true';
//   }
//   if (excludeInvalid) {
//     headers['X-Exclude-Invalid'] = 'true';
//   }
//   const client = new GraphQLClient('https://graphql.datocms.com', { headers });
//   return client.request(query, variables);
// }

// import { request, gql } from 'graphql-request'

// const query = gql`
//   {
//     company {
//       ceo
//     }
//     roadster {
//       apoapsis_au
//     }
//   }
// `

// request('https://api.spacex.land/graphql/', query).then((data) => console.log(data))