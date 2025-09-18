interface ScoreBadgeProps {
    score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
    let badgeColor = "";
    let badgeText = "";
    if (score > 70) {
        badgeColor = "bg-badge-green bg-green-600";
        badgeText = "Good";
    } else if (score > 40) {
        badgeColor = "bg-badge-yellow bg-yellow-600";
        badgeText = "Average";
    } else {
        badgeColor = "bg-badge-red bg-red-600";
        badgeText = "Poor";
    }

    return (
        <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
            <p className="text-sm font-medium">{badgeText}</p>
        </div>
    )
}

export default ScoreBadge;