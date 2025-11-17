
function PageHeader({ title, description }: { title: string, description: string }) {
    return (
        <>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {title}
            </h1>
            <p className="text-gray-600">
                {description}
            </p>
        </>
    )
}

export default PageHeader