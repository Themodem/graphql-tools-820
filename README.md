# Quick Bug Sample

```
yarn
yarn start
```

3 Servers will be spun up.

## Server 1
This is a simple service with 2 types and 2 queries

## Server 2
This is a simple service with 3 types and one query

## Server
This combines the 2 remote services `server1` and `server2` and transforms the `User` type to add in a `sites` function

Hitting [http://localhost:4000/](http://localhost:4000/) with the payload

```
{
	quizzes{
		title
		questions{
			title
		}
		player {
			displayName
			sites {
				title
			}
		}
	}
}
```

Will give you the error

```
{
  "data": {
    "quizzes": [
      {
        "title": "Hello World",
        "questions": [
          {
            "title": "Hello World"
          },
          {
            "title": "Hello World"
          }
        ],
        "player": {
          "displayName": "Hello World",
          "sites": null
        }
      },
      {
        "title": "Hello World",
        "questions": [
          {
            "title": "Hello World"
          },
          {
            "title": "Hello World"
          }
        ],
        "player": {
          "displayName": "Hello World",
          "sites": null
        }
      }
    ]
  },
  "errors": [
    {
      "message": "Cannot read property 'args' of undefined",
      "locations": [
        {
          "line": 9,
          "column": 7
        }
      ],
      "path": [
        "quizzes",
        0,
        "player",
        "sites"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "stacktrace": [
            "TypeError: Cannot read property 'args' of undefined",
            "    at graphql-tools-820/node_modules/graphql-tools/src/transforms/AddArgumentsAsVariables.ts:103:15",
            "    at Array.forEach (<anonymous>)",
            "    at graphql-tools-820/node_modules/graphql-tools/src/transforms/AddArgumentsAsVariables.ts:95:39",
            "    at Array.map (<anonymous>)",
            "    at addVariablesToRootField (graphql-tools-820/node_modules/graphql-tools/src/transforms/AddArgumentsAsVariables.ts:66:36)",
            "    at AddArgumentsAsVariablesTransform.transformRequest (graphql-tools-820/node_modules/graphql-tools/src/transforms/AddArgumentsAsVariables.ts:31:11)",
            "    at graphql-tools-820/node_modules/graphql-tools/src/transforms/transforms.ts:24:21",
            "    at Array.reduce (<anonymous>)",
            "    at Object.applyRequestTransforms (graphql-tools-820/node_modules/graphql-tools/src/transforms/transforms.ts:21:21)",
            "    at graphql-tools-820/node_modules/graphql-tools/src/stitching/delegateToSchema.ts:90:28"
          ]
        }
      }
    },
    {
      "message": "Cannot read property 'args' of undefined",
      "locations": [
        {
          "line": 9,
          "column": 7
        }
      ],
      "path": [
        "quizzes",
        1,
        "player",
        "sites"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "stacktrace": [
            "TypeError: Cannot read property 'args' of undefined",
            "    at graphql-tools-820/node_modules/graphql-tools/src/transforms/AddArgumentsAsVariables.ts:103:15",
            "    at Array.forEach (<anonymous>)",
            "    at graphql-tools-820/node_modules/graphql-tools/src/transforms/AddArgumentsAsVariables.ts:95:39",
            "    at Array.map (<anonymous>)",
            "    at addVariablesToRootField (graphql-tools-820/node_modules/graphql-tools/src/transforms/AddArgumentsAsVariables.ts:66:36)",
            "    at AddArgumentsAsVariablesTransform.transformRequest (graphql-tools-820/node_modules/graphql-tools/src/transforms/AddArgumentsAsVariables.ts:31:11)",
            "    at graphql-tools-820/node_modules/graphql-tools/src/transforms/transforms.ts:24:21",
            "    at Array.reduce (<anonymous>)",
            "    at Object.applyRequestTransforms (graphql-tools-820/node_modules/graphql-tools/src/transforms/transforms.ts:21:21)",
            "    at graphql-tools-820/node_modules/graphql-tools/src/stitching/delegateToSchema.ts:90:28"
          ]
        }
      }
    }
  ]
}
```
