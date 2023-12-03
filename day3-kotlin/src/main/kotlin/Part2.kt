import kotlin.io.path.Path
import kotlin.io.path.forEachLine

fun Part2() {
    var sumOfNwithAdjacent = 0;
    // [numbers, specials]

    Path("input").forEachLine { line ->
        val numbers = numberPattern.findAll(line);
        val specials = specialPattern.findAll(line);

        list.addLast(listOf(numbers.toList(), specials.toList()))
    }

    for(i in 0..list.count()-1) {
        for(j in 0..list[i][1].count()-1) {
            val matches = ArrayList<Int>()
            var currentMatch = list[i][1][j];
            matches.addAll(searchLine2(currentMatch.range.first, list[i][0]))

            if(i-1 >= 0)
                matches.addAll(searchLine2(currentMatch.range.first, list[i-1][0]))
            if(i+1 <= list.count()-1)
                matches.addAll(searchLine2(currentMatch.range.first, list[i+1][0]))
            if(matches.count() == 2) {
                sumOfNwithAdjacent += matches[0]*matches[1]
            }
        }
    }
    println("Part2: ${sumOfNwithAdjacent}")

}

fun searchLine2(coord: Int, content: List<MatchResult>) : List<Int> {
    val filter = content.filter {
        it.range.first-1 <= coord && coord <= it.range.last+1
    }
    return filter.map { it.value.toInt() }
}