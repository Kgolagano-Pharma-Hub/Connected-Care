package org.cmdbuild.utils.cad.test;

import org.cmdbuild.utils.cad.geo.CadPointTransformationHelper;
import org.cmdbuild.utils.cad.geo.PointTransformationRuleImpl;
import org.cmdbuild.utils.cad.model.CadPoint;
import org.junit.Test;

import static org.cmdbuild.utils.cad.model.CadPoint.point;
import static org.junit.Assert.assertEquals;

public class CadTransformationTest {

    @Test
    public void testCadPointTransformation1() {
        // Simply call method, result is dummy
        new CadPointTransformationHelper(PointTransformationRuleImpl.rcs("EPSG:3003", "EPSG:4326")).cadPointToGeoPoint(point(0,0));
    }

    @Test
    public void testCadPointTransformation2() {
        // Stub, do nothing
    }

    @Test
    public void testCadPointTransformation3() {
        assertEquals(point(0,0), new CadPointTransformationHelper(PointTransformationRuleImpl.scaling(0.1,0.1,0,0)).cadPointToGeoPoint(point(0,0)));
    }
}
