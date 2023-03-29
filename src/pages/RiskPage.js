import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import BannerComponent from "../components/BannerComponent";

export default function RiskPage() {
    return (
        <>
            <NavbarComponent/>
            <BannerComponent src={"risks-banner.jpg"} alt={"Image of a street name called time for change"}/>
            <div className={"ml-32 mr-32 mt-10 w-auto text-xl"}>
                <p className={"text-base mb-4"}>
                    Continuous monitoring of the risks in your home environment helps to ensure that the chance you or a
                    loved one is affected by an avoidable accident is as small as possible.
                    Risk assessments are quick, easy and intuitive - and can help save lives. Don't put one off any
                    longer than you have to, make use of our FREE template and carry out a risk assessment
                    on your home environment today!
                </p>
                <p className={"text-base mb-4"}>
                    Learn more about Risk Assessments by reading our Risk Assessment article on the Education page!
                </p>
                <p1 className={"font-bold"}>Risk Assessment FAQ</p1>
                <ul className={"list-decimal ml-12 gap-y-5"}>
                    <li className={"mt-2"}>Why should I carry out a Risk Assessment?</li>
                    <p1 className={"text-base"}>
                        If you want to live (and raise children) in a safe, happy and risk-free
                        environment, then a risk assessment is the most effective way to accomplish that.
                    </p1>
                    <li className={"mt-2"}>How long does a Risk Assessment take?</li>
                    <p1 className={"text-base"}>
                        Carrying out a Risk Assessment is not difficult, but in order to be effective they do need to be
                        thorough. For a typical household, we expect a comprehensive Risk Assessment to take about an
                        hour.
                    </p1>
                    <li className={"mt-2"}>Is your Risk Assessment Template sufficient?</li>
                    <p1 className={"text-base"}>
                        Our FREE supplied Risk Assessment template is sufficient enough for most use cases. However,
                        we encourage our users to build upon the template we have provided to best fit their needs.
                    </p1>
                </ul>
                <a href={"https://www.iow.gov.uk/documentlibrary/download/health-and-safety-risk-assessment-template"}>
                    <p className={"mt-8 text-sm underline"}>Click to download our template for FREE!</p>
                </a>
            </div>
            <FooterComponent/>
        </>
    )
}