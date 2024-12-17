import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from "@/styles/Layout.module.css";
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import home from '../../../Images/home.svg'
interface BreadcrumbsProps {
    parent: {
        name: string;
        link: string;
    };
    currentPage?: string;
}

const Breadcrumbs = ({ parent, currentPage }: BreadcrumbsProps) => {
    const router = useRouter();
    const currentPageName = currentPage || router.pathname.split('/').pop() || 'Current Page';

    return (
        <section className={styles.breadcrumbs_section}>
            <Container>
                <Row>
                    <Col md={12}>
                        <nav className={styles.breadcrumbs}>
                            <ul>
                                <li>
                                    <Link href="/"><Image src={home} alt="Home" /> Home</Link>
                                </li>
                                {parent && (
                                    <li>
                                        <Link href={parent.link}>{parent.name}</Link>
                                    </li>
                                )}
                                <li className={styles.current}>{currentPageName}</li>
                            </ul>
                        </nav>
                    </Col>
                </Row>
            </Container>
        </section>

    );
};

Breadcrumbs.defaultProps = {
    parent: { name: 'Default Parent', link: '/' },
    currentPage: 'Current Page',
};

export default Breadcrumbs;
