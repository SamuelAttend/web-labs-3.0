export default async () => {
    const status = (await (await import('../api/auth/token/route')).GET()).status
    return (status === 200)
}