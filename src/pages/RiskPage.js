import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import BannerComponent from "../components/BannerComponent";

export default function RiskPage() {
    return (
        <>
            <NavbarComponent />
            <BannerComponent src={"risks-banner.jpg"} alt={"Image of a street name called time for change"}/>
            <div className={"ml-32 mr-32 mt-10 w-auto text-xl"}>
                <p className={"text-base mb-4"}>
                    Continuous monitoring of the risks in your home environment helps to ensure that the chance you or a loved one is affected by an avoidable accident is as small as possible.
                    Risk assessments are quick, easy and intuitive - and can help save lives. Don't put one off any longer than you have to, make use of our FREE template and carry out a risk assessment
                    on your home environment today!
                </p>
                <p1 className={"font-bold"}>Risk Assessment FAQ</p1>
                <ul className={"list-decimal ml-12 mt-4"}>
                    <li>Why should I carry out a risk assessment?</li>
                    <p1 className={"text-base"}>words</p1>
                </ul>
                <a href={"https://www.hse.gov.uk/simple-health-safety/risk/risk-assessment-template-2019.docx"}>
                    <p className={"mt-8 text-sm underline"}>Click to download our template for FREE!</p>
                </a>
            </div>
            <FooterComponent />
        </>
    )
}