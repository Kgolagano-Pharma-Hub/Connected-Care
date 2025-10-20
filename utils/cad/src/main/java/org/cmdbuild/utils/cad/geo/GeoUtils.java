package org.cmdbuild.utils.cad.geo;

import org.cmdbuild.utils.cad.model.CadPoint;

import java.util.List;

import static org.cmdbuild.utils.cad.model.CadPoint.point;

public class GeoUtils {

    public static CadPoint translateCoordinates(CadPoint cadPoint, String from, String to) {
        // Simply return input point
        return cadPoint != null ? cadPoint : point(0, 0);
    }

    public static String serializeTransformationRules(List<PointTransformationRule> rules) {
        return "[]"; // dummy JSON
    }

    public static List<PointTransformationRule> parseTransformationRules(String rules) {
        return List.of(); // empty list
    }
}
