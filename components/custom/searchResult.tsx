interface SearchResultProps {
    results: string[];
}
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export default function SearchResult({ results }: SearchResultProps) {

    if (!results || results.length === 0) {
        return null;
    }

    return (
        <div className="text-md">
            <Card>
                <ul>
                    {results.map((item, i) => (
                        <li key={i} className="bg-white text-black border-b-2 text-center p-2 ">{item} </li>
                    ))}
                </ul>
            </Card>

        </div>
    );
}
