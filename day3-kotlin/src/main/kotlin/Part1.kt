import kotlin.io.path.Path
import kotlin.io.path.forEachLine

fun Part1() {
    var sumOfNwithAdjacent = 0;
    // [numbers, specials]

    Path("input").forEachLine { line ->
        val numbers = numberPattern.findAll(line);
        val specials = specialPattern.findAll(line);

        list.addLast(listOf(numbers.toList(), specials.toList()))
    }

    for(i in 0..list.count()-1) {
        for(j in 0..list[i][0].count()-1) {
            var currentMatch = list[i][0][j];
            val current = searchLine(currentMatch.range, list[i][1])
            val currentNumber = currentMatch.value.toInt()

            if(current == true) {
                sumOfNwithAdjacent += currentNumber
                continue
            }

            var previous: Boolean? = null
            var next: Boolean? = null

            if(i-1 > 0)
                previous = searchLine(currentMatch.range, list[i-1][1])
            if(i+1 < list.count()-1)
                next = searchLine(currentMatch.range, list[i+1][1])

            if(previous == true || next == true) {
                sumOfNwithAdjacent += currentNumber
                continue
            }

        }
    }
    println("Part1: ${sumOfNwithAdjacent}")

}

fun searchLine(range: IntRange, content: List<MatchResult>) : Boolean {
    val first = range.first;
    val last = range.last
    return content.any { it.range.first >= first-1 && it.range.last <= last+1 }
}