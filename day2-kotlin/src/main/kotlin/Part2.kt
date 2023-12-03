import kotlin.io.path.Path
import kotlin.io.path.forEachLine

fun Part2() {
    var sumMultiplication = 0;
    Path("input").forEachLine { line ->

        val rounds = line.split(";", ":");
        var red = 0;
        var blue = 0;
        var green = 0;

        for (i in 1..rounds.count() - 1) {

            rounds[i].split(',').forEach { group ->
                val amount = group.substring(1, group.lastIndexOf(' ')).toInt()

                if(group.indexOf("green") != -1 && amount > green)
                    green=amount;
                if(group.indexOf("blue") != -1 && amount > blue)
                    blue=amount;
                if(group.indexOf("red") != -1 && amount > red)
                    red=amount;
            }
        }
        sumMultiplication += red*blue*green;
    }

    println("Part 2: ${sumMultiplication}")

}