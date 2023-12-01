import kotlin.io.path.Path
import kotlin.io.path.forEachLine

fun Part1() {
    var sum = 0;
    val pathName = "input";
    val numberRegEx = Regex("[1-9]");
    Path(pathName).forEachLine { line ->
        if(line.isNullOrEmpty())
            return@forEachLine;

        if(!line.contains(numberRegEx))
            return@forEachLine;

        val first = line[line.indexOfFirst { numberRegEx.containsMatchIn(it.toString()) }]
        val last = line[line.indexOfLast { numberRegEx.containsMatchIn(it.toString()) }]
        val number = "${first}${last}".toInt()
        sum += number;
    }
    println("Part1 answer: ${sum}")
}