import kotlin.io.path.Path
import kotlin.io.path.forEachLine

val digitRegex = "[1-9]"
val numberStrings = arrayOf("one","two","three","four","five","six","seven","eight","nine")
val numberStringsRegex = numberStrings.joinToString(separator = "|")

fun convertToInt(num: CharSequence) : CharSequence {
    if(Regex(digitRegex).matches(num)) {
        return num;
    }

    if(Regex(numberStringsRegex).matches(num)) {
        return (numberStrings.indexOf(num) + 1).toString();
    }

    return "";
}

fun Part2() {
    var sum = 0;
    val pathName = "input";
    val lookAheadPrefix = "(?=("
    val overlapPostfix = "))"
    val numberRegEx = Regex(
            "${lookAheadPrefix}" +
            "${digitRegex}" +
            "|" +
            "${numberStringsRegex}" +
            "${overlapPostfix}");
    Path(pathName).forEachLine { line ->
        if(line.isNullOrEmpty())
            return@forEachLine;

        if(!line.contains(numberRegEx))
            return@forEachLine;

        val matches = numberRegEx.findAll(line);
        val first = convertToInt(matches.first().groupValues[1]);
        val last = convertToInt(matches.last().groupValues[1]);
        val number = "${first}${last}".toInt()
        sum += number
    }
    print("Part2 answer: ${sum}")
}