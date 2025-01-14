import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { ElectionRepo } from "./usecase/ports/ElectionRepo";
import { getElection } from "./usecase/getElection";
import * as elements from 'typed-html'

export function createFront(electionRepo: ElectionRepo) {
    new Elysia()
        .use(html())
        .get('/', () => (
            <BaseHtml>
                <section class="h-full dark:bg-gray-800 dark:text-gray-100">
                    <div class="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
                        <h1 class="text-4xl font-bold leadi sm:text-5xl text-violet-400">Consensus</h1>
                        <p class="px-8 mt-8 mb-12 text-lg">Create polls and vote using the <span class='text-violet-400'>majority judgment</span>,
                            a ranking algorithm based on grades, proven to be more fair than other voting methods</p>
                        <div class="flex flex-wrap justify-center">
                            <a href="/create"
                                class="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Create poll</a>
                        </div>
                    </div>
                </section>
            </BaseHtml>
        ))
        .post('/clicked', () => <div>Hi fron the server!</div>)
        .get('/create', () => (<BaseHtml><div>This is a new page</div></BaseHtml>))
        .get('/election/:id', ({ params }) => <Election id={params.id} electionRepo={electionRepo} />)
        .listen(8080)
}

async function Election({ id, electionRepo }: { id: string, electionRepo: ElectionRepo }) {
    const election = await getElection(id, electionRepo)
    return (
        <div>
            Election name: {election.name}

        </div>
    )
}

async function BaseHtml({ children }) {
    return (
        <html lang="en" class='h-screen w-screen'>

            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1.0" />
                <script src="https://unpkg.com/htmx.org@1.9.6"
                    integrity="sha384-FhXw7b6AlE/jyjlZH5iHa/tTe9EpJ1Y55RjcgPbjeWMskSxZt1v9qkxLJWNJaGni"
                    crossorigin="anonymous"></script>
                <script src="https://cdn.tailwindcss.com"></script>

                <title>Consensus</title>
            </head>

            <body class='w-full h-full dark:bg-gray-800 dark:text-gray-100"'>
                {children}
            </body>

        </html>
    )
}
