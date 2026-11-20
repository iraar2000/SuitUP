import "./headerInfo.css"

export default function HeaderInfo({ message = "", url = "", urlName = "" }: { message: string, url: string, urlName: string }) {
    return (
        // the header info section
        <section className="header-info-section">
            <p className="info-title">{message}</p>
            <a href={`${url}`} className="info-navigator">{urlName}</a>
        </section>
    )
}